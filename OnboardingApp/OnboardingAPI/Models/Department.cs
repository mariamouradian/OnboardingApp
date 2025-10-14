namespace OnboardingAPI.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string HRContact { get; set; } = string.Empty; // Контакт HR для подразделения

        public List<Employee> Employees { get; set; } = new();
    }
}