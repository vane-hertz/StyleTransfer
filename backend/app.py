import base64
import io
from PIL import Image
from flask import Flask, request, jsonify, send_file
import torch
from torchvision import transforms
from neural_style import neural_style

app = Flask(__name__)

# Configure device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

@app.route('/api/style-transfer', methods=['POST'])
def style_transfer():
    content_img_data = request.form['content_image']
    style_img_data = request.form['style_image']

    # Decode and load images
    content_image = load_image_from_base64(content_img_data)
    style_image = load_image_from_base64(style_img_data)

    # Perform style transfer
    stylized_image = neural_style(content_image, style_image, device)

    # Save stylized image to buffer
    buffer = io.BytesIO()
    stylized_image.save(buffer, format='PNG')
    buffer.seek(0)

    # Send the stylized image as a response
    return send_file(buffer, mimetype='image/png', as_attachment=True, attachment_filename='stylized_image.png')

def load_image_from_base64(base64_data):
    img_data = base64.b64decode(base64_data.split(',')[1])
    return Image