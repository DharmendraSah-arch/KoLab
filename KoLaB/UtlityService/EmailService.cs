using KoLaB.Models;

namespace KoLaB.UtlityService
{
    public class EmailService:IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration configuration)
        {
            _config = configuration;
        }
        public void SendEmail(EmailModel emailMode)
        {
           // var emailMessage = new MimeMessage();

        }
    }
}
