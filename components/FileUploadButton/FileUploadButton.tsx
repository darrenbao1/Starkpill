import React, { useState, ChangeEvent } from "react";
interface Props {
	setSelectedFile: (file: File) => void;
	selectedFile: File | null;
}

function FileUploadComponent({ setSelectedFile, selectedFile }: Props) {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	return (
		<div>
			<input
				type="file"
				accept=".jpg, .jpeg, .png" // Specify the allowed file types
				onChange={handleFileChange}
			/>
			{selectedFile && (
				<div style={{ color: "black" }}>
					<p>Selected File: {selectedFile.name}</p>
					<p>File Size: {selectedFile.size} bytes</p>
				</div>
			)}
		</div>
	);
}

export default FileUploadComponent;
