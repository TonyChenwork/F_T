import os
import json
from PIL import Image

def process_all_images(base_dir='images',quality=80):
    count = 0
    for root,dirs,files in os.walk(base_dir):
        for filename in files:
            if filename.lower().endswith(('.jpg','.jpeg','.png','.nef','.tiff')):
                full_path = os.path.join(root,filename)
                img = Image.open(full_path)
                
                max_side = max(img.size)
                if max_side > 2560:
                    scale_ratio = float(2560 / max_side)
                    new_w = int(img.size[0]*scale_ratio)
                    new_h = int(img.size[1]*scale_ratio)

                    img = img.resize((new_w,new_h),Image.Resampling.LANCZOS)

                new_filename = os.path.splitext(filename)[0] + '.webp'
                path_save = os.path.join(root,new_filename)

                img.save(path_save , 'WEBP' ,quality=quality ,method=6)
                os.remove(full_path)
                print(f'已将位置{root}/{filename}位置的图片更新为.webp格式')
                count += 1
    print(f'已经将全部{count}张照片处理成.webp格式!')


if __name__ == '__main__':
    process_all_images()
   

                    

