import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import { defaultArticleState } from 'src/constants/articleProps';
import { SubmitForm } from 'src/types';

export const App = () => {
	const [currentFont, setCurrentFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [currentBgColor, setCurrentBgColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleSubmitForm = (form: SubmitForm) => {
		setCurrentFont(form.font);
		setCurrentFontSize(form.fontSize);
		setCurrentFontColor(form.fontColor);
		setCurrentBgColor(form.bgColor);
		setCurrentContentWidth(form.contentWidth);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentFont.value,
					'--font-size': currentFontSize.value,
					'--font-color': currentFontColor.value,
					'--bg-color': currentBgColor.value,
					'--container-width': currentContentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isFormOpen={false}
				currentFont={currentFont}
				currentFontSize={currentFontSize}
				currentFontColor={currentFontColor}
				currentBgColor={currentBgColor}
				currentContentWidth={currentContentWidth}
				onSubmitForm={handleSubmitForm}
			/>
			<Article />
		</main>
	);
};
