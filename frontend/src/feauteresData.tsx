import {
	FaSmile,
	FaMicrophone,
	FaFileAlt,
	FaSync,
	FaComment,
	FaUser,
} from "react-icons/fa"

const featuresData = {
	features: [
		{
			title: "Facial Expression Analysis",
			description:
				"Real-time recognition of facial expressions for accurate emotion interpretation. Fine-tuned algorithms capture subtle nuances, ensuring precision.",
			icon: <FaSmile />,
		},
		{
			title: "Voice Tone Recognition",
			description:
				"Analyzes voice tones and inflections to discern underlying emotions in spoken words. Adaptable to various languages and accents for a globally inclusive experience.",
			icon: <FaMicrophone />,
		},
		{
			title: "Text Analysis",
			description:
				"Applies advanced natural language processing to analyze written text and extract emotional nuances. Enhances the overall understanding of user sentiment in written communication.",
			icon: <FaFileAlt />,
		},
		{
			title: "Cross-Modal Integration",
			description:
				"Seamlessly integrates data from multiple modalities for a comprehensive emotion profile. Provides a holistic understanding by combining facial, vocal, and gestural cues.",
			icon: <FaSync />,
		},
		{
			title: "Real-time Feedback",
			description:
				"Delivers instant feedback on emotional states, fostering responsive and adaptive communication. Enables dynamic adjustments for improved user engagement.",
			icon: <FaComment />,
		},
		{
			title: "User-Friendly Interface",
			description:
				"Intuitive design for effortless integration into existing systems or applications. User-friendly dashboards for easy monitoring and customization.",
			icon: <FaUser />,
		},
	],
}

export default featuresData
