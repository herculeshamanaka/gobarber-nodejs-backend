# Password Recovery
**FR**
Functional Rules

- The user must be able to recover the password using his e-mail;
- The user must receive and e-mail with password recovery instructions;
- The user must be able to reset his password;

**nFR**
non-Functional Rules

- Use Mailtrap to test email sending on development mode;
- Use Amazon SES to send email on production mode;
- Email sending process must run in background;

**BR**
Business Rules

- The link sent by e-mail to recover password must expire in 2 hours
- The user must confirm his password when reseting the password;

# Profile Update
**FR**
- The user must be able to update his profile (name, email, password);

**nFR**

**BR**
- The user CAN not update the email by an already existing email
- To update his password, the user must inform the old password;
- To update his passowrd, the user must confirm the new password;

# Service Appointment
**FR**
- The user must be able to list all service providers;
- The user must be able to check the available days of a month with at least on avaiable schedule of a service provider;
- The user must be able to list available schedule of a service provider;
- The user must be able to confirm an appointment with the service provider;

**nFR**
- The service providers list must be storage in cache to avoid unecessary loadings

**BR**
- The appointment must last 1 hour;
- The appointments time must be between 8AM til 6PM;
- The user can NOT set a schedule of a busy time;
- The user can NOT set an appointment in the past;
- The user can NOT schedule an appointment with himself;

# Provider Dashboard
**FR**
- The user must be able to list his appointments of a specific day;
- The service provider must receive a notification when a appointment is scheduled;
- The service provider must be able to display the unread notifications;

**nFR**
- The service provider appointments of a day must be stored in cache;
- The notifications must be stored in MongoDB;
- The notifications must be sent in real time using Socket.io;

**BR**
- The notification must have a status of read/unread;


