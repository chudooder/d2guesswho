import os

for root, dirs, files in os.walk('./img'):
  names = [filename[:-4] for filename in files]
  print(names)