import os
import base64
from PIL import Image
import io

# Khởi tạo SDK Gemini
# import google.generativeai as genai
from google import genai
from google.genai import types
import mimetypes
client = genai.Client(api_key='AIzaSyAdHv8wtKN89t6fglMO_yqMz1f2dBzwhvo')
# genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

MODEL_NAME = "gemini-3-flash-preview"  # chọn model Vision hỗ trợ image understanding

def load_image_base64(path):
    """Đọc file ảnh và chuyển sang Base64 để gửi lên API."""
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

def analyze_eye_image(image_path):
    """Upload the image and call the flash-preview model using uploaded file reference + inline part."""

    # Prompt gửi lên Gemini để phân tích
    prompt = (
        "Ảnh này có 1 hay 2 mắt? "
        "Nếu không có mắt nào, trả lời '0'. "
        "Trả lời tách riêng: số lượng mắt, "
        "và tình trạng của mắt theo 3 mức low/medium/high "
        "(ví dụ: low = kém rõ, medium = bình thường, high = rõ ràng)."
    )

    try:
        # 1) upload the file and get a reference
        uploaded_file = client.files.upload(file=image_path)

        # 2) prepare an inline part from bytes (second example image usage)
        with open(image_path, 'rb') as f:
            img_bytes = f.read()

        mime_type = mimetypes.guess_type(image_path)[0] or 'image/png'
        part = types.Part.from_bytes(data=img_bytes, mime_type=mime_type)

        # 3) call model with prompt + uploaded file reference + inline part
        contents = [prompt, uploaded_file, part]

        response = client.models.generate_content(model=MODEL_NAME, contents=contents)

        # SDK may return different attributes: prefer output_text, then text
        result_text = getattr(response, 'output_text', None) or getattr(response, 'text', None) or str(response)
        if isinstance(result_text, str):
            return result_text.strip()

        return str(result_text)

    except Exception as exc:
        print('[AI] Error calling model with uploaded file + part:', exc)
        raise

def main():
    import argparse

    # parser = argparse.ArgumentParser()
    # parser.add_argument("image", help="Đường dẫn tới file ảnh mắt")
    # args = parser.parse_args()
    # Read images from uploads folder and pick the first valid image path
    uploads_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uploads", "retina"))
    if not os.path.exists(uploads_dir):
        print(f"Uploads directory not found: {uploads_dir}")
        return

    valid_images = {".jpg", ".jpeg", ".gif", ".png", ".tga", ".bmp", ".tiff"}
    image_files = [
        os.path.join(uploads_dir, fname)
        for fname in os.listdir(uploads_dir)
        if os.path.splitext(fname)[1].lower() in valid_images
    ]

    if not image_files:
        print(f"No valid images found in: {uploads_dir}")
        return

    image_path = image_files[0]
    print(f"Analyzing image: {image_path}")

    try:
        result = analyze_eye_image(image_path)
        print("\nKẾT QUẢ PHÂN TÍCH:")
        print(result)
    except Exception as e:
        print("Error analyzing image:", e)

if __name__ == "__main__":
    main()
