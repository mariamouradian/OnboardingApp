using OnboardingAPI.Models;

namespace OnboardingAPI.Services
{
    public class DefaultTasksService
    {
        public static List<OnboardingTask> GetDefaultTasks(int employeeId, DateTime hireDate)
        {
            return new List<OnboardingTask>
            {
                new()
                {
                    EmployeeId = employeeId,
                    Order = 1,
                    Title = "Экскурсия по офису",
                    Description = "Правила бизнес-центра, презентация Добро пожаловать!",
                    StartTime = new TimeOnly(9, 0),
                    EndTime = new TimeOnly(9, 15),
                    Location = "Большая переговорная",
                    Navigation = "Кабинет:6.15",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 2,
                    Title = "Оформление приема",
                    Description = "Ознакомление с ЛНА, оформление Трудового договора",
                    StartTime = new TimeOnly(9, 15),
                    EndTime = new TimeOnly(12, 15),
                    Location = "Большая переговорная",
                    Navigation = "Кабинет:6.15",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 3,
                    Title = "Инструктаж по пожарной безопасности",
                    Description = "Схема эвакуации, инструкция, подпись",
                    StartTime = new TimeOnly(12, 15),
                    EndTime = new TimeOnly(12, 30),
                    Location = "Отдел обеспечения деятельности",
                    Navigation = "6 этаж, Отдел обеспечения деятельности",
                    ContactPerson = "Специалист по охране труда - Иванов Иван",
                    ContactPhone = "Тел: 1133",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 4,
                    Title = "Инструктаж по охране труда (ИОТР)",
                    Description = "Инструктаж по охране труда",
                    StartTime = new TimeOnly(12, 30),
                    EndTime = new TimeOnly(12, 45),
                    Location = "Отдел обеспечения деятельности",
                    Navigation = "6 этаж, Отдел обеспечения деятельности",
                    ContactPerson = "Специалист по охране труда - Иванов Иван",
                    ContactPhone = "Тел: 1133",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 5,
                    Title = "Обеденный перерыв",
                    Description = "Обеденный перерыв",
                    StartTime = new TimeOnly(12, 45),
                    EndTime = new TimeOnly(13, 30),
                    Location = "",
                    Navigation = "",
                    ContactPerson = "",
                    ContactPhone = "",
                    IsSkippable = true,
                    IsCompleted = true // Автоматически завершен
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 6,
                    Title = "Оформление пропуска",
                    Description = "Оформление пропуска",
                    StartTime = new TimeOnly(13, 30),
                    EndTime = new TimeOnly(13, 45),
                    Location = "Отдел обеспечения деятельности",
                    Navigation = "6 этаж, Отдел обеспечения деятельности",
                    ContactPerson = "Офис-менеджер - Петров Петр",
                    ContactPhone = "Тел: 1116",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 7,
                    Title = "Получение канцелярии",
                    Description = "Получение канцелярии",
                    StartTime = new TimeOnly(13, 45),
                    EndTime = new TimeOnly(14, 0),
                    Location = "Отдел обеспечения деятельности",
                    Navigation = "6 этаж, Отдел обеспечения деятельности",
                    ContactPerson = "Офис-менеджер - Петров Петр",
                    ContactPhone = "Тел: 1116",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 8,
                    Title = "Получение оборудования",
                    Description = "Ноутбук, сим карты, телефон, инструкцию по получении ЭЦП",
                    StartTime = new TimeOnly(14, 0),
                    EndTime = new TimeOnly(14, 30),
                    Location = "Отдел IT",
                    Navigation = "6 этаж, Отдел информационных технологий",
                    ContactPerson = "Начальник отдела IT - Сидор Сидоров",
                    ContactPhone = "Тел: 1125",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 9,
                    Title = "Знакомство с директором по персоналу",
                    Description = "Знакомство с директором по персоналу",
                    StartTime = new TimeOnly(14, 30),
                    EndTime = new TimeOnly(14, 50),
                    Location = "Кабинет директора по персоналу",
                    Navigation = "",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 10,
                    Title = "Заполнить карточку сотрудника",
                    Description = "Заполнить карточку сотрудника",
                    StartTime = new TimeOnly(14, 50),
                    EndTime = new TimeOnly(15, 0),
                    Location = "Письмо в почте",
                    Navigation = "Самостоятельно",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 11,
                    Title = "Оформление командировок",
                    Description = "Порядок оформления командировок, порядок оплаты служебных командировок",
                    StartTime = new TimeOnly(15, 0),
                    EndTime = new TimeOnly(15, 30),
                    Location = "Большая переговорная",
                    Navigation = "Самостоятельно",
                    ContactPerson = "наставник",
                    ContactPhone = "",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 12,
                    Title = "Знакомство с сотрудниками по командировкам",
                    Description = "Знакомство с сотрудниками по командировкам",
                    StartTime = new TimeOnly(15, 30),
                    EndTime = new TimeOnly(15, 50),
                    Location = "Кабинет бухгалтерии",
                    Navigation = "Кабинет:6.18",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 13,
                    Title = "Получение спец. одежды",
                    Description = "Получение спец. одежды, набор эксперта (для РП в командировку)",
                    StartTime = new TimeOnly(15, 50),
                    EndTime = new TimeOnly(16, 10),
                    Location = "Отдел обеспечения деятельности",
                    Navigation = "6 этаж, Отдел обеспечения деятельности",
                    ContactPerson = "Специалист по охране труда - Иванов Иван",
                    ContactPhone = "Тел: 1133",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 14,
                    Title = "Настройка профиля",
                    Description = "Установить фотографию в профиле почтового клиента. Создать подпись по шаблону брендбука. Установить фотографию на корпоративном портале.",
                    StartTime = new TimeOnly(16, 10),
                    EndTime = new TimeOnly(16, 30),
                    Location = "В папке 22, адаптация",
                    Navigation = "Самостоятельно",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 15,
                    Title = "Знакомство с руководителем",
                    Description = "Знакомство с ЗГД/руководитель",
                    StartTime = new TimeOnly(16, 30),
                    EndTime = new TimeOnly(16, 50),
                    Location = "Кабинет руководителем",
                    Navigation = "Самостоятельно",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = false
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 16,
                    Title = "Регистрация на обучающей платформе",
                    Description = "Зарегистрироваться на платформе от предприятия (доступ к обучающим материалам и библиотеке)",
                    StartTime = new TimeOnly(16, 50),
                    EndTime = new TimeOnly(17, 0),
                    Location = "Ссылка в письме Добро пожаловать!",
                    Navigation = "Самостоятельно",
                    ContactPerson = "курирующий HR",
                    ContactPhone = "",
                    IsSkippable = true
                },
                new()
                {
                    EmployeeId = employeeId,
                    Order = 17,
                    Title = "Получение ЭЦП",
                    Description = "Получение ЭЦП в удостоверяющем центре",
                    StartTime = new TimeOnly(17, 0),
                    EndTime = new TimeOnly(18, 0),
                    Location = "г. Москва, ул. Проспект Мира 33, стр1",
                    Navigation = "Самостоятельно",
                    ContactPerson = "IT",
                    ContactPhone = "Письмо от УЦ",
                    IsSkippable = true
                }
            };
        }
    }
}