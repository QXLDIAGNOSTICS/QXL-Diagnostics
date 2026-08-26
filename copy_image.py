import shutil
import os

src = '/Users/afi/.gemini/antigravity-ide/brain/8fb10792-7840-4669-80cc-61dbc0d9a84d/media__1787731984220.png'
dest = './public/images/posters/happy_onam_wide_banner.png'

print("Copying from", src, "to", dest)
shutil.copy(src, dest)
print("Copy completed successfully. File size:", os.path.getsize(dest))
