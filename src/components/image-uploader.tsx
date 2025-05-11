"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ImageFile = { url: string; file: File };

interface ImageUploaderProps {
	maxFiles?: number;
	value?: ImageFile[];
	onChange?: (files: ImageFile[]) => void;
	className?: string;
}

function SortableImage({
	preview,
	index,
	onRemove,
	isMain,
}: {
	preview: ImageFile;
	index: number;
	onRemove: (index: number) => void;
	isMain: boolean;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: preview.url });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				"relative aspect-square overflow-hidden rounded-lg border-2",
				isDragging && "opacity-50",
				isMain ? "border-primary" : "border-border",
			)}
			{...attributes}
			{...listeners}
		>
			<Image
				src={preview.url}
				alt="Offer image"
				fill
				className="object-cover"
			/>
			{isMain && (
				<div className="absolute left-0 top-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-br-lg">
					Main photo
				</div>
			)}
			<button
				type="button"
				onClick={() => onRemove(index)}
				className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 cursor-pointer"
				aria-label="Remove image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
		</div>
	);
}

export function ImageUploader({
	maxFiles = 5,
	value = [],
	onChange,
	className,
}: ImageUploaderProps) {
	const [previews, setPreviews] = useState<ImageFile[]>(value);
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	useEffect(() => {
		setPreviews(value);
	}, [value]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (previews.length + acceptedFiles.length > maxFiles) {
				return;
			}

			const newPreviews = acceptedFiles.map((file) => ({
				url: URL.createObjectURL(file),
				alt: file.name,
				file: file,
			}));

			const updatedPreviews = [...previews, ...newPreviews];
			setPreviews(updatedPreviews);
			onChange?.(updatedPreviews);
		},
		[maxFiles, onChange, previews],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif"],
		},
		maxFiles: maxFiles - previews.length,
	});

	const removeImage = useCallback(
		(index: number) => {
			const newPreviews = previews.filter((_, i) => i !== index);
			setPreviews(newPreviews);
			onChange?.(newPreviews);
		},
		[onChange, previews],
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = previews.findIndex(
				(preview) => preview.url === active.id,
			);
			const newIndex = previews.findIndex((preview) => preview.url === over.id);

			const newPreviews = arrayMove(previews, oldIndex, newIndex);
			setPreviews(newPreviews);
			onChange?.(newPreviews);
		}

		setActiveId(null);
	};

	return (
		<div
			className={cn(
				"flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-5 gap-4",
				className,
			)}
		>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={previews.map((preview) => preview.url)}
					strategy={rectSortingStrategy}
				>
					{previews.map((preview, index) => (
						<SortableImage
							key={preview.url}
							preview={preview}
							index={index}
							onRemove={removeImage}
							isMain={index === 0}
						/>
					))}
				</SortableContext>
				<DragOverlay>
					{activeId ? (
						<div className="relative aspect-square overflow-hidden rounded-lg border-2 border-primary">
							<Image
								src={previews.find((p) => p.url === activeId)?.url || ""}
								alt="Dragging image"
								fill
								className="object-cover"
							/>
						</div>
					) : null}
				</DragOverlay>
			</DndContext>
			{previews.length < maxFiles && (
				<div
					{...getRootProps()}
					className={cn(
						"flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors",
						isDragActive
							? "border-primary bg-primary/10"
							: "border-muted-foreground/25 hover:border-primary",
					)}
				>
					<input {...getInputProps()} />
					<Plus className="h-8 w-8 text-muted-foreground" />
				</div>
			)}
		</div>
	);
}
