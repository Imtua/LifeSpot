using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        /// <summary>
        /// Маппинг CSS-файлов
        /// </summary>
        /// <param name="builder"></param>
        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            var ccsFiles = new[] { "index.css" };

            foreach (var file in ccsFiles)
            {
                builder.MapGet($"/Static/CSS/{file}", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", file);
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
            }

        }

        /// <summary>
        /// Маппинг JS-файлов
        /// </summary>
        /// <param name="builder"></param>
        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            var jsFiles = new[] { "index.js", "testing.js", "about.js" };

            foreach (var file in jsFiles)
            {
                builder.MapGet($"/Static/JS/{file}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", file);
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            }
        }

        /// <summary>
        /// Маппинг HTML-страниц
        /// </summary>
        /// <param name="builder"></param>
        public static void MapHTML(this IEndpointRouteBuilder builder)
        {
            string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
            string sliderHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "slider.html"));

            builder.MapGet("/", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                var viewText = await File.ReadAllTextAsync(viewPath);

                // Загружаем шаблон страницы, вставляя в него элементы
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);

                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/about", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");

                    // Загружаем шаблон страницы, вставляя в него элементы
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml)
                        .Replace("<!-- SLIDER -->", sliderHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

            builder.MapGet("/testing", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

                    // Загружаем шаблон страницы, вставляя в него элементы
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

        }
    }
}
