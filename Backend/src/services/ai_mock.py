import random

AI_COMMENTS = [
    "Mild diabetic retinopathy detected.",
    "No obvious abnormalities detected.",
    "Possible mild macular edema.",
    "Scattered hard exudates observed.",
    "Glaucoma risk suspected – intraocular pressure measurement recommended.",
    "Normal retinal appearance.",
    "Presence of microaneurysms.",
    "Signs suggest mild retinal inflammation.",
    "Image quality is insufficient for reliable diagnosis.",
    "Hypertensive retinopathy suspected.",
    "Small retinal hemorrhages detected.",
    "Early-stage age-related macular degeneration (AMD).",
    "No neovascularization observed.",
    "Retinal pigment epithelium abnormalities detected.",
    "Old retinal scar identified.",
    "Routine follow-up recommended.",
    "Further clinical examination required.",
    "Moderate risk of retinal disease.",
    "No evidence of retinal detachment.",
    "Follow-up examination recommended in 3 months.",
    "Possible optic nerve head cupping.",
    "Signs of mild optic disc edema.",
    "Suspected retinal vein occlusion.",
    "Suspected retinal artery occlusion.",
    "Early signs of cataract affecting image clarity.",
    "Possible vitreous degeneration.",
    "Signs suggest dry eye–related artifacts.",
    "Possible epiretinal membrane detected.",
    "Peripheral retinal degeneration observed.",
    "Low risk findings – monitoring advised."
]

def random_ai_result():
    return random.choice(AI_COMMENTS), round(random.uniform(0.6, 0.95), 2)
