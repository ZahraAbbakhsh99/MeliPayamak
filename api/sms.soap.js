const soap = require('soap');

const WSDL_URL = process.env.PAYAMAK_WSDL;
if (!WSDL_URL) {
  throw new Error('Missing PAYAMAK_WSDL in env');
}
class SoapSMS {
  constructor() {
    this.username = process.env.PAYAMAK_USERNAME;
    this.password = process.env.PAYAMAK_PASSWORD;
    this.from = process.env.PAYAMAK_FROM;

    if (!this.username || !this.password || !this.from) {
      throw new Error('Missing Payamak ENV variables');
    }
  }

  async _getClient() {
    return soap.createClientAsync(WSDL_URL);
  }

  // SendSimpleSMS2 (single RecID or error)
  async sendSimpleSMS2(to, text, isflash = false) {
    const client = await this._getClient();

    const args = {
      username: this.username,
      password: this.password,
      to,
      from: this.from,
      text,
      isflash
    };

    const [result] = await client.SendSimpleSMS2Async(args);
    return result.SendSimpleSMS2Result;
  }

  // SendSimpleSMS (array of strings)
  async sendSimpleSMS(toList, text, isflash = false) {
    const client = await this._getClient();

    if (toList.length > 1 && !text.includes('لغو11')) {
      text = `${text}\nلغو11`;}

    const args = {
      username: this.username,
      password: this.password,
      to: {string: toList},
      from: this.from,
      text,
      isflash
    };

    const [result] = await client.SendSimpleSMSAsync(args);

    const res = result.SendSimpleSMSResult;
    if (!res || !res.string) return ['ERROR'];

    return Array.isArray(res.string)
      ? res.string
      : [res.string];
  }
}

// Export easy-to-use functions
const sms = new SoapSMS();

module.exports = {
  sendSMS2: (to, text, isflash) =>
    sms.sendSimpleSMS2(to, text, isflash),

  sendSMS: (toList, text, isflash) =>
    sms.sendSimpleSMS(toList, text, isflash)
};

