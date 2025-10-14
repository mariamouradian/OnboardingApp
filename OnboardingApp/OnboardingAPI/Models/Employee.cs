using System.ComponentModel.DataAnnotations;

namespace OnboardingAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Position { get; set; } = string.Empty;

        public DateTime HireDate { get; set; } = DateTime.UtcNow;

        public int DepartmentId { get; set; }

        public Department? Department { get; set; }

        public string? MentorId { get; set; }

        public List<OnboardingTask> Tasks { get; set; } = new();
    }
}