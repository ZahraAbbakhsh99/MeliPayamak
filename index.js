require('dotenv').config();
const { sendSMS2, sendSMS } = require('./api/sms.soap');

(async () => {
  try {
    // SendSimpleSMS2
    const res2 = await sendSMS2(
      '09123456789',
      '1تست',
      false
    );
    console.log('SendSimpleSMS2 result:', res2);

    // SendSimpleSMS
    const res = await sendSMS(
      [
        '09123456789',
        '09123456789',
      ],
      'تست2',
      false
    );
    console.log('SendSimpleSMS result:', res);

  } catch (err) {
    console.error('SOAP Error:', err.message);
  }
})();
