using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers;

public class APIController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}