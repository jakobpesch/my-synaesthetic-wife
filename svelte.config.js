/**
 * @import {Root} from 'rehype'
 */

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { parse } from 'svelte/compiler';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';
// import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
const colorMap = {
	a: '#FF573380',
	b: '#33FF5780',
	c: '#3357FF80',
	d: '#FF33A180',
	e: '#A133FF80',
	f: '#33FFA180',
	g: '#FF8C3380',
	h: '#8C33FF80',
	i: '#33FF8C80',
	j: '#FF333380',
	k: '#33FF3380',
	l: '#3333FF80',
	m: '#FF33FF80',
	n: '#33FFFF80',
	o: '#FFFF3380',
	p: '#FF663380',
	q: '#6633FF80',
	r: '#33FF6680',
	s: '#FF336680',
	t: '#66FF3380',
	u: '#3366FF80',
	v: '#FF33CC80',
	w: '#33CCFF80',
	x: '#CCFF3380',
	y: '#FF993380',
	z: '#9933FF80'
};

async function html(content) {
	const svast = parse(content);
	const { start, end } = svast.html;
	const string = content.slice(start, end);
	const file = await unified()
		.use(rehypeParse, { fragment: true })
		.use(duplicateElement)
		.use(syneasthesia)
		.use(rehypeStringify)
		.process(string);

	const code = content.replace(string, String(file));
	console.log(code);

	return {
		code
	};
}

function duplicateElement() {
	/**
	 * @param {Root} tree
	 */
	return function (tree) {
		visit(tree, 'element', function (node) {
			const t = node.children.find((child) =>
				child.properties?.className?.includes('to-be-colored')
			);
			if (t) {
				const toBeColored = JSON.parse(JSON.stringify(t));
				toBeColored.properties.className = toBeColored.properties.className.filter(
					(cn) => cn !== 'to-be-colored'
				);
				node.children.unshift(toBeColored);
			}
		});
	};
}

function syneasthesia() {
	/**
	 * @param {Root} tree
	 */
	return function (tree) {
		visit(tree, 'element', function (node) {
			if (node.properties?.className?.includes('to-be-colored')) {
				console.log('???');
				console.log(node);
				node.properties.style = 'position: absolute; top: 0; left: 0;';
				node.children.forEach((child) => {
					if (child.tagName === 'p' || child.tagName === 'h1') {
						const grandchild = child.children.pop();
						for (let i = 0; i < grandchild.value.length; i++) {
							const letter = grandchild.value.charAt(i);
							if (letter.match(/[a-zA-Z]/)) {
								const color = colorMap[letter.toLowerCase()] || '#000000'; // Default to black if no color is found
								child.children.push(h('span', { style: `color: ${color}` }, letter));
							} else {
								child.children.push({ type: 'text', value: letter });
							}
						}
					}
				});
			}
		});
	};
}

function syneasthesiaPreprocessor() {
	return {
		name: 'syneasthesia',
		markup({ content, filename }) {
			console.log(filename);

			if (!filename.includes('src/lib/components/synesthesia.svelte')) {
				return {
					code: content
				};
			}

			// html(content).then(console.log);
			return html(content);

			// Replace each letter with its corresponding color from the color map within <article> tags
			// const updatedContent = content.replace(
			// 	/<article[^>]*>(.*?)<\/article>/gs,
			// 	(match, articleContent) => {
			// 		const coloredArticleContent = articleContent.replace(/(>[^<]+<)/g, (text) => {
			// 			return text.replace(/[a-zA-Z]/g, (letter) => {
			// 				const color = colorMap[letter.toLowerCase()] || '#000000'; // Default to black if no color is found
			// 				return `<span style="color: ${color}">${letter}</span>`;
			// 			});
			// 		});
			// 		return `${match}\n\n<!-- Colored Version -->\n<article class="fade-in prose syn font-bold">${coloredArticleContent}</article>`;
			// 	}
			// );

			// return {
			// 	code: updatedContent
			// };
		}
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	// extensions: ['.svelte'],
	preprocess: [vitePreprocess(), syneasthesiaPreprocessor()],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
