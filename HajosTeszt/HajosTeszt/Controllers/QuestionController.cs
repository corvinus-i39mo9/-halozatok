using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [ApiController]
    public class QuestionController : ControllerBase
    {
        [HttpGet]
        [Route("questions/count")]
        public int M1()
        {
            HajostesztContext context = new HajostesztContext();
            int kerdesekSzama = context.Questions.Count();
            return kerdesekSzama;
        }

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int sorszám)
        {
            HajostesztContext context = new HajostesztContext();
            var kerdes = (from x in context.Questions
                          where x.QuestionId == sorszám
                          select x).FirstOrDefault();

            if (kerdes == null) return BadRequest("Nincs ilyen sorszámú kérdés");
            return new JsonResult(kerdes);
        }
    }
}
