type TabProps = {
	index: number;
	label: string;
	isActive: boolean;
	onClick: (index: number) => void;
};

export const Tab = ({ index, label, isActive, onClick }: TabProps) => {
	return (
		<div
			onClick={() => onClick(index)}
			style={{
				borderBottom: isActive ? "4px solid #FF4F0A" : "none",
				fontWeight: isActive ? "bold" : "normal",
				height: "38px",
				cursor: "pointer",
			}}>
			{label}
		</div>
	);
};
