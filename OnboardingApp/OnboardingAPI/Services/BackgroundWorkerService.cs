using OnboardingAPI.Interfaces;

namespace OnboardingAPI.Services
{
    public class BackgroundWorkerService : BackgroundService
    {
        private readonly ILogger<BackgroundWorkerService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public BackgroundWorkerService(ILogger<BackgroundWorkerService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Фоновая служба запущена.");

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Проверка просроченных задач...");

                // Создаем scope для получения scoped-сервисов
                using (var scope = _serviceProvider.CreateScope())
                {
                    var onboardingService = scope.ServiceProvider.GetRequiredService<IOnboardingService>();
                    await onboardingService.CheckOverdueTasks();
                }

                // Ожидаем 5 минут до следующей проверки
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
            _logger.LogInformation("Фоновая служба остановлена.");
        }
    }
}