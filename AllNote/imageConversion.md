# Image coversion 

First install ImageMagick via:

    sudo apt-get install imagemagick
Open a terminal and run this command:

convert  -resize 50% source.png dest.jpg
It will reduce the size by 50%

Type and size conversion

    convert -resize 1024X768  source.png dest.jpg

Just size converion

    convert -resize 1024X768  source.png dest.png

You can also use: mogrify command-line tool from the same package.