### Images
#### Types of images
* Binary
* Gray
* RGB

#### Extracting dimensions from different format
JPEG to RGB
```python
from PIL import Image
im = Image.open("dead_parrot.jpg") #Can be many different formats.
pix = im.load()
print im.size #Get the width and hight of the image for iterating over
print pix[x,y] #Get the RGBA Value of the a pixel of an image
pix[x,y] = value # Set the RGBA Value of the image (tuple)

```

#### Conversion types
* RGB to Gray [link](http://scikit-image.org/docs/dev/api/skimage.color.html#skimage.color.rgb2grey)
    * Weights of 3 channels are different
* Conversion from grayscale to binary

#### Histograms
Distribution of gray level of an image

#### Filtering
* Image  I(x,y) Noise  N(x,y)
* Distrubutions of noise:
    * uniform distributions
    * Gaussian distribution
* Derivative of images:
    * backward difference
        * 1D: [-1 1]
    * forward difference
        * 1D: [1 -1]
    * central difference
        * 1D: [-1 0 1]
        * 2D: 
            * ![Image1](images/Image1.jpg)

#### correlation

#### convolution

#### Mean

#### Wighted mean

