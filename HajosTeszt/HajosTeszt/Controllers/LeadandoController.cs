using HajosTeszt.LeadandoModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/leadando")]
    [ApiController]
    public class LeadandoController : ControllerBase
    {
        [HttpGet]
        [Route(("/leadando/count"))]
        public int M1()
        {
            dbContext context = new dbContext();
            int sorokSzama = context.Students.Count();
            return sorokSzama;
        }

        // GET: api/leadando
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            dbContext context = new dbContext();
            return context.Students.ToList();
        }

        // GET api/leadando/5
        [HttpGet("{id}")]
        public Student Get(int id)
        {
            dbContext context = new dbContext();
            var keresettSor = (from x in context.Students
                               where x.StudentId == id
                               select x).FirstOrDefault();
            return keresettSor;
        }

        // POST api/leadando
        [HttpPost]
        public void Post([FromBody] Student ujSor)
        {
            dbContext context = new dbContext();
            context.Students.Add(ujSor);
            context.SaveChanges();
            
        }


        // DELETE api/leadando/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbContext context = new dbContext();
            var törlendőSor = (from x in context.Students
                                where x.StudentId == id
                                select x).FirstOrDefault();
            context.Remove(törlendőSor);
            context.SaveChanges();
        } 
    }
}
