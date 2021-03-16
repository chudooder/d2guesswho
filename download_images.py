import requests
from bs4 import BeautifulSoup
import re
import shutil

page = requests.get('https://dota2.gamepedia.com/Category:Hero_icons')
soup = BeautifulSoup(page.text, 'html.parser')

thumbs = soup.find_all('div', class_='thumb')
images = {}
for thumb in thumbs:
  img = thumb.find('img')
  href = thumb.find('a')['href']

  src = img['src']
  print(href)
  hero_name = re.match(r'\/File:(.+)_icon.png', href).group(1)
  images[hero_name] = src

for hero_name, src in images.items():
  response = requests.get(src, stream=True)
  with open('img/'+hero_name+'.png', 'wb') as out_file:
    shutil.copyfileobj(response.raw, out_file)
  del response