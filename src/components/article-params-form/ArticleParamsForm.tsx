import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { SubmitForm } from 'src/types';

type ArticleParamsFormProps = {
	isFormOpen: boolean;
	currentFont: OptionType;
	currentFontSize: OptionType;
	currentFontColor: OptionType;
	currentBgColor: OptionType;
	currentContentWidth: OptionType;
	onSubmitForm: (form: SubmitForm) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(props.isFormOpen);
	const [currentFont, setCurrentFont] = useState(props.currentFont);
	const [currentFontSize, setCurrentFontSize] = useState(props.currentFontSize);
	const [currentFontColor, setCurrentFontColor] = useState(
		props.currentFontColor
	);
	const [currentBgColor, setCurrentBgColor] = useState(props.currentBgColor);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		props.currentContentWidth
	);

	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (formRef.current && !formRef.current.contains(event.target)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [formRef]);

	const toggleFormVisible = () => {
		isFormOpen ? setIsFormOpen(false) : setIsFormOpen(true);
	};

	const resetForm = () => {
		setCurrentFont(props.currentFont);
		setCurrentFontSize(props.currentFontSize);
		setCurrentFontColor(props.currentFontColor);
		setCurrentBgColor(props.currentBgColor);
		setCurrentContentWidth(props.currentContentWidth);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		props.onSubmitForm({
			font: currentFont,
			fontSize: currentFontSize,
			fontColor: currentFontColor,
			bgColor: currentBgColor,
			contentWidth: currentContentWidth,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleFormVisible} />
			<aside
				ref={formRef}
				className={
					isFormOpen
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={currentFont}
						options={fontFamilyOptions}
						onChange={setCurrentFont}
						onClose={() => {}}
					/>

					<RadioGroup
						title='Размер шрифта'
						selected={currentFontSize}
						options={fontSizeOptions}
						onChange={setCurrentFontSize}
						name='font width'
					/>

					<Select
						title='Цвет шрифта'
						selected={currentFontColor}
						options={fontColors}
						onChange={setCurrentFontColor}
						onClose={() => {}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={currentBgColor}
						options={backgroundColors}
						onChange={setCurrentBgColor}
						onClose={() => {}}
					/>

					<Select
						title='Ширина контента'
						selected={currentContentWidth}
						options={contentWidthArr}
						onChange={setCurrentContentWidth}
						onClose={() => {}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							onClick={resetForm}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							onClick={toggleFormVisible}
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
