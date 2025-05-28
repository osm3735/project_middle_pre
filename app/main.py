from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
import uvicorn

app = FastAPI()

# 정적 파일 경로 설정 (예: /css, /js 등)
app.mount("/css", StaticFiles(directory="templates/css"), name="css")
app.mount("/js", StaticFiles(directory="templates/js"), name="js")
app.mount("/img", StaticFiles(directory="templates/img"), name="img")
app.mount("/json", StaticFiles(directory="templates/json"), name="json")

# 템플릿 설정
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
@app.get("/index", response_class=HTMLResponse)
async def index(request: Request):
        return templates.TemplateResponse("index.html", {"request": request})
@app.get("/map_view", response_class=HTMLResponse)
async def read_map_view(request: Request):
    return templates.TemplateResponse("map_view.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)

