using Microsoft.AspNetCore.Mvc;
using OnboardingAPI.Interfaces;

namespace OnboardingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IExpressService _expressService;

        public TestController(IExpressService expressService)
        {
            _expressService = expressService;
        }

        [HttpPost("test-message")]
        public async Task<IActionResult> TestMessage()
        {
            await _expressService.SendMessageToChat("general", "Тестовое сообщение из OnboardingAPI!");
            return Ok("Сообщение отправлено (или сымитировано)");
        }
    }
}