import cv2
import easyocr
import matplotlib.pyplot as plt
import numpy as np

#read images

image_path = 'static/images/test1.png'
img = cv2.imread(image_path)
#instance text detector
reader = easyocr.Reader(['en'],gpu=False)


# detect text on image
text_ = reader.readtext(img)
# print(text)


# draw bbox and text

for t in text_:
    bbox,text,score =t
    print(text)
    
    cv2.rectangle(img,bbox[0],bbox[2],(0,255,0),5)
    plt.imshow(cv2.cvtColor(img,cv2.COLOR_BGR2RGB))
    plt.show()

