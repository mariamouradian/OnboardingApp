namespace OnboardingAPI.Interfaces
{
    public interface IExpressService
    {
        Task SendMessageToChat(string chatId, string message);
    }
}