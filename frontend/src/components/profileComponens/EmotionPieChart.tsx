import React, { useEffect, useRef } from "react"
import { Pie } from "react-chartjs-2"
import "chart.js/auto"

interface EmotionData {
	label: string
	percentage: number
}

interface PieChartProps {
	emotionsData: EmotionData[]
}

const PieChart: React.FC<PieChartProps> = ({ emotionsData }) => {
	const data = {
		labels: emotionsData.map((emotion) => emotion.label),
		datasets: [
			{
				data: emotionsData.map((emotion) => emotion.percentage),
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#FF5733",
					"#33FF57",
					"#5733FF",
					"#57FF33",
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#FF5733",
					"#33FF57",
					"#5733FF",
					"#57FF33",
				],
			},
		],
	}

	console.log(data)

	return <Pie data={data} />
}

export default PieChart
