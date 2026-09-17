import zipfile
import os
import tempfile
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

orig_path = r'd:\Projects\HackGrid\docs\CropEye_Pitch_Deck_original.pptx'
target_path = r'd:\Projects\HackGrid\docs\CropEye_Pitch_Deck.pptx'
temp_dir = tempfile.mkdtemp()
temp_zip = os.path.join(temp_dir, 'temp.pptx')

with zipfile.ZipFile(orig_path, 'r') as zin, zipfile.ZipFile(temp_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'ppt/slides/slide5.xml':
            text = data.decode('utf-8')
            text = text.replace('above 10 mph wind', 'above 16 km/h (10 mph) wind')
            data = text.encode('utf-8')
            print('✓ Patched slide 5: wind threshold to 16 km/h (10 mph)')
        elif item.filename == 'ppt/slides/slide6.xml':
            text = data.decode('utf-8')
            idx = text.find('priced $349')
            end = text.find('</a:t>', idx)
            old_str = text[idx:end]
            new_str = 'priced ₹28,999–₹49,999/mo ($349–$599/mo) for 500–5,000 acre commercial farms'
            text = text[:idx] + new_str + text[end:]
            data = text.encode('utf-8')
            print(f'✓ Patched slide 6: {old_str} -> {new_str}')
        elif item.filename == 'ppt/slides/slide7.xml':
            text = data.decode('utf-8')
            text = text.replace('$34,200 saved / outbreak', '₹28.4L ($34.2k) saved / outbreak')
            data = text.encode('utf-8')
            print('✓ Patched slide 7: metric to ₹28.4L ($34.2k) saved / outbreak')
        zout.writestr(item, data)

shutil.move(temp_zip, target_path)
shutil.rmtree(temp_dir)
print('Successfully patched CropEye_Pitch_Deck.pptx without any PowerShell escaping bugs!')
