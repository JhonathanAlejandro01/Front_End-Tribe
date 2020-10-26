const blurBodyPart = async (tracker, bodyParts = [], backgroundBlurAmounT, edgeBlurAmounT) => {


    const parts = {
        'left_face':0, 	
        'torso_front': 12,
        'right_face':1,
        'torso_back':13,
        'left_upper_arm_front':2,
        'left_upper_leg_front':14,
        'left_upper_arm_back':3,
        'left_upper_leg_back':15,
        'right_upper_arm_front': 4,
        'right_upper_leg_front':16,
        'right_upper_arm_back':5,
        'right_upper_leg_back':17,
        'left_lower_arm_front':8,
        'left_lower_leg_front':18,
        'left_lower_arm_back':7,
        'left_lower_leg_back':19,
        'right_lower_arm_front':8,
        'right_lower_leg_front':20,
        'right_lower_arm_back':9,
        'right_lower_leg_back':21,
        'left_hand':10,
        'left_foot': 22,
        'right_hand':11,
        'right_foot': 23
    }

    const backgroundBlurAmount = backgroundBlurAmounT;
    const edgeBlurAmount = edgeBlurAmounT;
    const flipHorizontal = false;

    const faceBodyPartIdsToBlur = [...bodyParts];

    bodyPix.blurBodyPart(
        tracker.canvas_1.firstChild, tracker.video, tracker.prediction_bodyPartsPerson, faceBodyPartIdsToBlur,
        backgroundBlurAmount, edgeBlurAmount, flipHorizontal);




}
 
export default blurBodyPart;