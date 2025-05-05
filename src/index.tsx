import './styles/index.scss';
import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { SubmitForm } from './types';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
