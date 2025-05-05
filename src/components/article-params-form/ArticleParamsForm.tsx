import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { SubmitForm } from 'src/types';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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
	const [isOpen, setIsOpen] = useState(props.isFormOpen);
	const [currentFont, setCurrentFont] = useState(props.currentFont);
	const [currentFontSize, setCurrentFontSize] = useState(props.currentFontSize);
	const [currentFontColor, setCurrentFontColor] = useState(
		props.currentFontColor
	);
	const [currentBgColor, setCurrentBgColor] = useState(props.currentBgColor);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		props.currentContentWidth
	);

	const rootRef = useRef<HTMLDivElement>(null);

	const onClose = () => {
		setIsOpen(false);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	const toggleFormVisible = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const resetForm = () => {
		setCurrentFont(defaultArticleState.fontFamilyOption);
		setCurrentFontSize(defaultArticleState.fontSizeOption);
		setCurrentFontColor(defaultArticleState.fontColor);
		setCurrentBgColor(defaultArticleState.backgroundColor);
		setCurrentContentWidth(defaultArticleState.contentWidth);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
			<ArrowButton isOpen={isOpen} onClick={toggleFormVisible} />
			<aside
				ref={rootRef}
				className={
					isOpen
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
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={currentBgColor}
						options={backgroundColors}
						onChange={setCurrentBgColor}
					/>

					<Select
						title='Ширина контента'
						selected={currentContentWidth}
						options={contentWidthArr}
						onChange={setCurrentContentWidth}
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
