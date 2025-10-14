namespace OnboardingAPI.Models
{
    public class OnboardingTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public bool IsSkipped { get; set; }
        public bool IsSkippable { get; set; } = true; // Можно пропустить
        public int Order { get; set; } // Порядок выполнения
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Navigation { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;

        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }
}
