const $main_chromatic = document.querySelector('[data-chromatic="main"]');
const $circle_colors = document.querySelector('[data-chromatic="colors"]');

const $view_finder_hex = document.querySelector('[data-chromatic="hexInput"]');
const $view_finder_rgb = document.querySelector('[data-chromatic="rgbInput"]');
const $view_finder_rgba = document.querySelector('[data-chromatic="rgbaInput"]');

const $all_range_inputs_colors = document.querySelectorAll('input[type="range"]');
const $range_color_rgb_alpha = document.querySelector('.chromatic__range-a');

const $button_copy_color_hex = document.querySelector('[data-chromatic="copyHex"]');
const $button_copy_color_rgb = document.querySelector('[data-chromatic="copyRgb"]');
const $button_copy_color_rgba = document.querySelector('[data-chromatic="copyRgba"]');
const $button_show_color = document.querySelector('[data-chromatic="showColor"]');

const all_colors_rgb = [0, 0, 0];
const all_colors_hex = [0, 0, 0];
let code_color_alpha = 1;

function applyBackgroundInCircle(colors_rgb, color_alpha_rgba){
    $circle_colors.style.backgroundColor = `rgba(${colors_rgb[0]}, ${colors_rgb[1]}, ${colors_rgb[2]}, ${color_alpha_rgba})`
    convertsColorsRgbToColorsHex(colors_rgb, color_alpha_rgba)
}

function applyBackgroundInMain(colors_rgb, color_alpha_rgba){
    $main_chromatic.style.backgroundColor = `rgba(${colors_rgb[0]},${colors_rgb[1]},${colors_rgb[2]},${color_alpha_rgba})`;
}

function convertsColorsRgbToColorsHex(colors_rgb, color_alpha_rgba){
    colors_rgb.forEach((color_rgb, index) => {
        let color_hex = Number(color_rgb).toString(16)
        if(color_hex.length < 2){
            all_colors_hex[index] = `0${color_hex.toUpperCase()}`;
        } else {
            all_colors_hex[index] = color_hex.toUpperCase();
        }
    });
    appliesTheColorCodeOnTheDispay(all_colors_hex, colors_rgb, color_alpha_rgba);
}

function appliesTheColorCodeOnTheDispay(colors_hex, colors_rgb, color_alpha_rgba){
    $view_finder_hex.value = `#${colors_hex[0]}${colors_hex[1]}${colors_hex[2]}`;
    $view_finder_rgb.value = `${colors_rgb[0]},${colors_rgb[1]},${colors_rgb[2]}`;
    $view_finder_rgba.value = `${colors_rgb[0]},${colors_rgb[1]},${colors_rgb[2]},${color_alpha_rgba}`;
}

function colorchromaticInitiator(){
    $button_copy_color_hex.addEventListener('click', () => {
	$view_finder_hex.select();
	document.execCommand('copy');
    }, false);
	
    $button_copy_color_rgb.addEventListener('click', () => {
	$view_finder_rgb.select();
	document.execCommand('copy');
    }, false),
	
    $button_copy_color_rgba.addEventListener('click', () => {
        $view_finder_rgba.select();
        document.execCommand('copy');
    }, false);

    $circle_colors.addEventListener('click', () => {
	$view_finder_hex.select();
	document.execCommand('copy')
    }, false);
	
    $button_show_color.addEventListener('click', () => {
	applyBackgroundInMain(all_colors_rgb, code_color_alpha);
    }, false);
	
    $all_range_inputs_colors.forEach((element_color, index) => {
	$range_color_rgb_alpha.addEventListener('input', () => {
	    code_color_alpha = $range_color_rgb_alpha.value; 
        }, false);
	  
    	element_color.addEventListener('input', () => {
	    all_colors_rgb[index] = element_color.value;
	    applyBackgroundInCircle(all_colors_rgb, code_color_alpha);
	}, false);
    });
}

window.addEventListener('load', colorchromaticInitiator, false);
