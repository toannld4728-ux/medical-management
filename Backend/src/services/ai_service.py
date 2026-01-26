from services.ai_mock import random_ai_result


class AIService:
    def __init__(self, image_repo, record_repo):
        self.image_repo = image_repo
        self.record_repo = record_repo

    def analyze_image(self, image_id: int):

        image = self.image_repo.get_by_id(image_id)

        if not image:
            return None

        # fake AI result
        comment, confidence = random_ai_result()

        # save AI diagnosis
        ai = self.image_repo.save_ai_result(
            image_id=image_id,
            confidence=confidence,
            raw_output=comment
        )

        # update medical record so doctor can see
        self.record_repo.update_status(image.record_id, "ai_done")

        return ai
