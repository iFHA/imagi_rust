use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;
use base64::prelude::*;
use image::{load_from_memory, DynamicImage, GenericImageView, ImageBuffer, Rgba};
use image::ImageOutputFormat::Png;

#[wasm_bindgen]
pub fn apply_filter(encoded_file: &str, filter: &str) -> String {

    let base64_to_vector = BASE64_STANDARD.decode(&encoded_file).unwrap();
    log(&"Image decoded".into());

    let mut img = load_from_memory(&base64_to_vector).unwrap();
    log(&"Image loaded from memory".into());

    // aplicando o filtro
    img = match filter {
        "grayscale" => grayscale(&img),
        "sepia" => apply_sepia(&img),
        __ => img
    };

    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();
    log(&"New image written in the buffer".into());

    let vector_to_base64 = BASE64_STANDARD.encode(&buffer);
    let data_url = format!("data:image/png;base64,{}", vector_to_base64);
    return data_url.into();
}

fn grayscale(img: &DynamicImage) -> DynamicImage {
    log(&"Grascale called".into());

    let new_img = img.grayscale();
    log(&"Grayscale effect applied".into());
    new_img // não precisa de return
}

fn apply_sepia(image: &DynamicImage) -> DynamicImage {
    log(&"sepia called".into());

    let (width, height) = image.dimensions();
    let mut sepia_image = ImageBuffer::new(width, height);

    for (x, y, pixel) in image.pixels() {
        let Rgba([r, g, b, a]) = pixel;
        let tr = (0.393 * (r as f32) + 0.769 * (g as f32) + 0.189 * (b as f32)).min(255.0) as u8;
        let tg = (0.349 * (r as f32) + 0.686 * (g as f32) + 0.168 * (b as f32)).min(255.0) as u8;
        let tb = (0.272 * (r as f32) + 0.534 * (g as f32) + 0.131 * (b as f32)).min(255.0) as u8;

        sepia_image.put_pixel(x, y, Rgba([tr, tg, tb, a]));
    }

    let image_rgba8 = DynamicImage::ImageRgba8(sepia_image);
    log(&"sepia effect applied".into());
    image_rgba8
}