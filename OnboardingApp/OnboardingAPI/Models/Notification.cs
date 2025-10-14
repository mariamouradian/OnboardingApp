namespace OnboardingAPI.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsRead { get; set; }

        public int? EmployeeId { get; set; } // Может быть null, если уведомление для HR

        public Employee? Employee { get; set; }

        public int? TaskId { get; set; }

        public OnboardingTask? Task { get; set; }

        public NotificationType Type { get; set; }

        public int DepartmentId { get; set; } // Для фильтрации уведомлений по подразделениям
    }
}