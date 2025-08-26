import os
from PIL import Image, ImageDraw, ImageFont
import io

def create_poe2_icon(size):
    """POE2 테마 아이콘 생성"""
    # 이미지 생성
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 배경 그라디언트 원 (금색)
    center = size // 2
    radius = int(size * 0.47)
    
    # 외부 원 (금색)
    draw.ellipse([center-radius, center-radius, center+radius, center+radius], 
                fill=(212, 175, 55, 255), outline=(139, 115, 85, 255), width=max(1, size//64))
    
    # 내부 원 (어두운 배경)
    inner_radius = int(size * 0.39)
    draw.ellipse([center-inner_radius, center-inner_radius, center+inner_radius, center+inner_radius], 
                fill=(26, 26, 26, 200))
    
    try:
        # 폰트 크기 조정
        font_size_large = max(12, int(size * 0.16))
        font_size_small = max(8, int(size * 0.063))
        
        # 시스템 폰트 사용
        try:
            font_large = ImageFont.truetype("arial.ttf", font_size_large)
            font_small = ImageFont.truetype("arial.ttf", font_size_small)
        except:
            try:
                font_large = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size_large)
                font_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size_small)
            except:
                font_large = ImageFont.load_default()
                font_small = ImageFont.load_default()
        
        # POE2 텍스트
        text_y_offset = int(size * 0.42)
        draw.text((center, text_y_offset), "POE2", font=font_large, 
                 fill=(212, 175, 55, 255), anchor="mm", stroke_width=max(1, size//128), 
                 stroke_fill=(26, 26, 26, 255))
        
        # 한국 가이드 텍스트 (작은 사이즈에서는 생략)
        if size >= 96:
            subtitle_y_offset = int(size * 0.55)
            draw.text((center, subtitle_y_offset), "한국 가이드", font=font_small, 
                     fill=(212, 175, 55, 200), anchor="mm")
        
        # 장식적 점들 (큰 사이즈에만)
        if size >= 144:
            dot_y = int(size * 0.68)
            dot_size = max(2, size // 64)
            draw.ellipse([center-dot_size, dot_y-dot_size, center+dot_size, dot_y+dot_size], 
                        fill=(212, 175, 55, 180))
            
            side_offset = int(size * 0.05)
            dot_size_small = max(1, size // 85)
            draw.ellipse([center-side_offset-dot_size_small, dot_y-dot_size_small, 
                         center-side_offset+dot_size_small, dot_y+dot_size_small], 
                        fill=(212, 175, 55, 128))
            draw.ellipse([center+side_offset-dot_size_small, dot_y-dot_size_small, 
                         center+side_offset+dot_size_small, dot_y+dot_size_small], 
                        fill=(212, 175, 55, 128))
        
    except Exception as e:
        print(f"텍스트 렌더링 에러 (크기 {size}): {e}")
    
    return img

# 필요한 모든 아이콘 크기
sizes = [72, 96, 128, 144, 152, 192, 384, 512]
icon_dir = "C:/Users/hee/poe2-korean-app/public/icons"

print("POE2 앱 아이콘 생성 시작...")

for size in sizes:
    try:
        img = create_poe2_icon(size)
        filename = f"icon-{size}x{size}.png"
        filepath = os.path.join(icon_dir, filename)
        img.save(filepath, "PNG", optimize=True)
        print(f"[OK] {filename} 생성 완료 ({img.size})")
    except Exception as e:
        print(f"[ERROR] {size}x{size} 아이콘 생성 실패: {e}")

# 추가로 favicon.ico도 생성
try:
    favicon_img = create_poe2_icon(32)
    favicon_path = "C:/Users/hee/poe2-korean-app/public/favicon.ico"
    favicon_img.save(favicon_path, "ICO", sizes=[(32, 32)])
    print("[OK] favicon.ico 생성 완료")
except Exception as e:
    print(f"[ERROR] favicon.ico 생성 실패: {e}")

print("아이콘 생성 완료!")