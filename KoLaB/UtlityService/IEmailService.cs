using KoLaB.Models;

namespace KoLaB.UtlityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
