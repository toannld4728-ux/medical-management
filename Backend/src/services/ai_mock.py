import random

AI_COMMENTS = [
    "Dấu hiệu nhẹ của bệnh võng mạc tiểu đường.",
    "Không thấy bất thường rõ rệt.",
    "Gợi ý phù hoàng điểm nhẹ.",
    "Có xuất tiết cứng rải rác.",
    "Nguy cơ glaucoma – cần đo nhãn áp.",
    "Hình ảnh bình thường.",
    "Có vi phình mạch.",
    "Gợi ý viêm nhẹ.",
    "Chất lượng ảnh chưa tốt.",
    "Nguy cơ võng mạc do tăng huyết áp.",
    "Xuất huyết nhỏ.",
    "Thoái hóa hoàng điểm sớm.",
    "Không thấy tân mạch.",
    "Rối loạn sắc tố võng mạc.",
    "Có sẹo cũ.",
    "Theo dõi định kỳ.",
    "Cần kiểm tra thêm.",
    "Nguy cơ trung bình.",
    "Không phát hiện bong võng mạc.",
    "Theo dõi 3 tháng."
]

def random_ai_result():
    return random.choice(AI_COMMENTS), round(random.uniform(0.6, 0.95), 2)
