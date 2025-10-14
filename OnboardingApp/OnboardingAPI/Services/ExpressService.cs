//using OnboardingAPI.Interfaces;

//namespace OnboardingAPI.Services
//{
//    public class MockExpressService : IExpressService
//    {
//        private readonly ILogger<MockExpressService> _logger;

//        public MockExpressService(ILogger<MockExpressService> logger)
//        {
//            _logger = logger;
//        }

//        public async Task SendMessageToChat(string chatId, string message)
//        {
//            // Имитируем небольшую задержку как при реальном API вызове
//            await Task.Delay(200);

//            _logger.LogInformation($"📨 [MOCK Express.ms] Сообщение в чат '{chatId}': {message}");

//            // Можно также выводить в консоль для наглядности
//            Console.WriteLine($"\n🚀 СООБЩЕНИЕ ОТПРАВЛЕНО:");
//            Console.WriteLine($"💬 Чат: {chatId}");
//            Console.WriteLine($"📝 Текст: {message}");
//            Console.WriteLine($"⏰ Время: {DateTime.Now}\n");
//        }
//    }
//}