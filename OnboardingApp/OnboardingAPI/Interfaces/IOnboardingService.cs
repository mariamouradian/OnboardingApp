using OnboardingAPI.Models;

namespace OnboardingAPI.Interfaces
{
    public interface IOnboardingService
    {
        Task CheckOverdueTasks();
        // Добавьте сюда другие необходимые методы
    }
}