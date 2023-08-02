from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view




from PIL import Image
from collections import defaultdict
import urllib.request
import requests
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim


urls = [
        "https://cssbattle.dev/targets/1@2x.png",
        "https://cssbattle.dev/targets/2@2x.png",
        "https://cssbattle.dev/targets/3@2x.png",
        "https://cssbattle.dev/targets/4@2x.png",
        "https://cssbattle.dev/targets/5@2x.png",
        "https://cssbattle.dev/targets/6@2x.png",
        "https://cssbattle.dev/targets/7@2x.png",
        "https://cssbattle.dev/targets/8@2x.png",
        "https://cssbattle.dev/targets/9@2x.png",
        "https://cssbattle.dev/targets/10@2x.png",
        "https://cssbattle.dev/targets/11@2x.png",
        "https://cssbattle.dev/targets/12@2x.png",
        "https://cssbattle.dev/targets/21@2x.png",
        "https://cssbattle.dev/targets/22@2x.png",
        "https://cssbattle.dev/targets/23@2x.png",
        "https://cssbattle.dev/targets/24@2x.png",
        "https://cssbattle.dev/targets/25@2x.png",
        "https://cssbattle.dev/targets/26@2x.png",
        "https://cssbattle.dev/targets/27@2x.png",
        "https://cssbattle.dev/targets/28@2x.png",
        "https://cssbattle.dev/targets/33@2x.png",
        "https://cssbattle.dev/targets/34@2x.png",
        "https://cssbattle.dev/targets/35@2x.png",
        "https://cssbattle.dev/targets/36@2x.png",
        "https://cssbattle.dev/targets/37@2x.png",
        "https://cssbattle.dev/targets/38@2x.png",
        "https://cssbattle.dev/targets/39@2x.png",
        "https://cssbattle.dev/targets/40@2x.png",
        "https://cssbattle.dev/targets/41@2x.png",
        "https://cssbattle.dev/targets/69@2x.png",
        "https://cssbattle.dev/targets/70@2x.png",
        "https://cssbattle.dev/targets/71@2x.png",
        "https://cssbattle.dev/targets/72@2x.png",
        "https://cssbattle.dev/targets/73@2x.png",
        "https://cssbattle.dev/targets/74@2x.png",
        "https://cssbattle.dev/targets/75@2x.png",
        "https://cssbattle.dev/targets/76@2x.png",
        "https://cssbattle.dev/targets/77@2x.png",
        "https://cssbattle.dev/targets/78@2x.png",
        "https://cssbattle.dev/targets/79@2x.png",
        "https://cssbattle.dev/targets/80@2x.png",
        "https://cssbattle.dev/targets/81@2x.png",
        "https://cssbattle.dev/targets/82@2x.png",
        "https://cssbattle.dev/targets/83@2x.png",
        "https://cssbattle.dev/targets/84@2x.png",
        "https://cssbattle.dev/targets/85@2x.png",
        "https://cssbattle.dev/targets/86@2x.png",
        "https://cssbattle.dev/targets/87@2x.png",
        "https://cssbattle.dev/targets/88@2x.png",
        "https://cssbattle.dev/targets/89@2x.png",
        "https://cssbattle.dev/targets/90@2x.png",
        "https://cssbattle.dev/targets/91@2x.png",
        "https://cssbattle.dev/targets/92@2x.png",
        "https://cssbattle.dev/targets/93@2x.png",
        "https://cssbattle.dev/targets/94@2x.png",
        "https://cssbattle.dev/targets/95@2x.png",
        "https://cssbattle.dev/targets/96@2x.png",
        "https://cssbattle.dev/targets/97@2x.png",
        "https://cssbattle.dev/targets/98@2x.png",
        "https://cssbattle.dev/targets/99@2x.png",
        "https://cssbattle.dev/targets/100@2x.png",
        "https://cssbattle.dev/targets/109@2x.png",
        "https://cssbattle.dev/targets/110@2x.png",
        "https://cssbattle.dev/targets/111@2x.png",
        "https://cssbattle.dev/targets/112@2x.png",
        "https://cssbattle.dev/targets/113@2x.png",
        "https://cssbattle.dev/targets/114@2x.png",
        "https://cssbattle.dev/targets/115@2x.png",
        "https://cssbattle.dev/targets/116@2x.png",
        "https://cssbattle.dev/targets/117@2x.png",
        "https://cssbattle.dev/targets/118@2x.png",
        "https://cssbattle.dev/targets/119@2x.png",
        "https://cssbattle.dev/targets/120@2x.png",
        "https://cssbattle.dev/targets/121@2x.png",
        "https://cssbattle.dev/targets/122@2x.png",
        "https://cssbattle.dev/targets/123@2x.png",
        "https://cssbattle.dev/targets/124@2x.png",
        "https://cssbattle.dev/targets/125@2x.png",
        "https://cssbattle.dev/targets/126@2x.png",
        "https://cssbattle.dev/targets/127@2x.png",
        "https://cssbattle.dev/targets/128@2x.png",
        "https://cssbattle.dev/targets/129@2x.png",
        "https://cssbattle.dev/targets/130@2x.png",
        "https://cssbattle.dev/targets/131@2x.png",
        "https://cssbattle.dev/targets/132@2x.png",
        "https://cssbattle.dev/targets/133@2x.png",
        "https://cssbattle.dev/targets/134@2x.png",
        "https://cssbattle.dev/targets/135@2x.png",
        "https://cssbattle.dev/targets/136@2x.png",
        "https://cssbattle.dev/targets/137@2x.png",
        "https://cssbattle.dev/targets/138@2x.png",
        "https://cssbattle.dev/targets/139@2x.png",
        "https://cssbattle.dev/targets/140@2x.png",
        "https://cssbattle.dev/targets/141@2x.png",
        "https://cssbattle.dev/targets/142@2x.png",
        "https://cssbattle.dev/targets/143@2x.png",
        "https://cssbattle.dev/targets/144@2x.png",
        "https://cssbattle.dev/targets/145@2x.png",
        "https://cssbattle.dev/targets/146@2x.png",
        "https://cssbattle.dev/targets/147@2x.png",
        "https://cssbattle.dev/targets/148@2x.png",
        "https://cssbattle.dev/targets/149@2x.png",
        "https://cssbattle.dev/targets/150@2x.png",
        "https://cssbattle.dev/targets/151@2x.png",
        "https://cssbattle.dev/targets/152@2x.png",
        "https://cssbattle.dev/targets/153@2x.png",
        "https://cssbattle.dev/targets/154@2x.png",
        "https://cssbattle.dev/targets/155@2x.png",
        "https://cssbattle.dev/targets/156@2x.png",
        "https://cssbattle.dev/targets/157@2x.png",
        "https://cssbattle.dev/targets/158@2x.png"
    ]

urlsNew = []
for num in range(1, 159):
    urlsNew.append("https://cssbattle.dev/targets/"+str(num)+"@2x.png")
data=[]
for url in urlsNew:
    """ data.append({
        "id":urls.index(url)+1,
        "url":url
        }) """
    data += [
        {
            'id': url[30:-7],
            'url': url
        }
    ]

# Create your views here.
@api_view(['POST'])
def main(request):
    return JsonResponse("cssArena", safe=False)

@api_view(['GET'])
def arenas(request):
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def getColors(request):
    # print(request.POST.get('id'))
    requestId = request.POST.get('id')
    def find_most_frequent_colors(image_path, num_colors=5):
        try:
            img = Image.open(image_path)
        except IOError:
            return []

        # Get the pixel data from the image
        pixels = img.getdata()

        # Create a dictionary to store the count of each color
        color_count = defaultdict(int)

        for pixel in pixels:
            # Convert the RGB values to a tuple (R, G, B)
            color = tuple(pixel)

            # Increment the count for this color
            color_count[color] += 1

        # Sort the colors by their frequency (count) in descending order
        sorted_colors = sorted(color_count.items(), key=lambda x: x[1], reverse=True)

        # Get the top 'num_colors' most frequent colors
        most_frequent_colors = sorted_colors[:num_colors]

        return most_frequent_colors

    colors = []
    hex_colors = []
    def rgb_to_hex(r, g, b):
        hex_colors.append('#{:02x}{:02x}{:02x}'.format(r, g, b))
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)
    urllib.request.urlretrieve("https://cssbattle.dev/targets/" + requestId + "@2x.png", "battleimg.png")
    image_path = "battleimg.png"   # Replace with the path to your image
    # You can adjust this value to get more or fewer colors
    most_frequent_colors = find_most_frequent_colors(image_path)
    if most_frequent_colors:
        for color, count in most_frequent_colors:
            if count > 10000:
                colors.append(color)
                hex = rgb_to_hex(color[0], color[1], color[2])
                # print("RGB_Color:", color, "Hex:", hex, "Count:", count)
    else:
        print("No colors found in the image.")

    return JsonResponse(hex_colors, safe=False)

""" @api_view(['POST'])
def getProblemImg(request):
    requestId = request.POST.get('id')
    return JsonResponse("https://cssbattle.dev/targets/" + requestId + ".png", safe=False) """

""" 
    def calculate_similarity(image1_path, image2_path):
        # Load the images
        image1 = cv2.imread(image1_path)
        image2 = cv2.imread(image2_path)

        # Resize the images to have the same dimensions
        image1_resized = cv2.resize(image1, (image2.shape[1], image2.shape[0]))

        # Calculate the similarity based on shape, color, and offset
        shape_similarity = calculate_shape_similarity(image1_resized, image2)
        color_similarity = calculate_color_similarity(image1_resized, image2)
        offset_similarity = calculate_offset_similarity(image1_resized, image2)

        # Combine the similarity measures into an overall similarity percentage
        similarity_percentage = (shape_similarity + color_similarity + offset_similarity) / 3 * 100

        return similarity_percentage


    def calculate_shape_similarity(image1, image2):
        # Calculate the similarity based on the shape (structure) of the images
        gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
        similarity = ssim(gray1, gray2, data_range=gray2.max() - gray2.min())
        return similarity


    def calculate_color_similarity(image1, image2):
        # Calculate the similarity based on the color of the images
        color_difference = np.mean(np.abs(image1.astype(float) - image2.astype(float)))
        color_similarity = 1 - color_difference / 255
        return color_similarity


    def calculate_offset_similarity(image1, image2):
        # Calculate the similarity based on the offset (position) of images
        moments1 = cv2.moments(cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY))
        moments2 = cv2.moments(cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY))
        centroid_x1 = int(moments1['m10'] / moments1['m00'])
        centroid_y1 = int(moments1['m01'] / moments1['m00'])
        centroid_x2 = int(moments2['m10'] / moments2['m00'])
        centroid_y2 = int(moments2['m01'] / moments2['m00'])
        offset_x = abs(centroid_x1 - centroid_x2)
        offset_y = abs(centroid_y1 - centroid_y2)
        max_image_size = max(image1.shape[0], image1.shape[1], image2.shape[0], image2.shape[1])
        offset_similarity = 1 - (max(offset_x, offset_y) / max_image_size)
        return offset_similarity
    """

@api_view(['POST'])
def getScore(request):
    # targetImageId = request.POST.get('id')
    userImageUrl = request.POST.get('url')
    def calculate_similarity(image1_path, image2_path):
        # Load the images
        image1 = cv2.imread(image1_path)
        image2 = cv2.imread(image2_path)

        # Ensure both images have the same dimensions
        image1 = cv2.resize(image1, (image2.shape[1], image2.shape[0]))

        # Calculate the absolute pixel-wise difference between the two images
        difference_image = cv2.absdiff(image1, image2)

        # Convert the difference image to grayscale
        gray_difference = cv2.cvtColor(difference_image, cv2.COLOR_BGR2GRAY)

        # Calculate the color difference based on pixel values
        color_difference = np.mean(gray_difference) / 255.0

        # Calculate the number of different pixels
        num_different_pixels = np.count_nonzero(gray_difference)

        # Calculate the total number of pixels
        total_pixels = gray_difference.size

        # Calculate the percentage of different pixels
        pixel_difference_percentage = (num_different_pixels / total_pixels) * 100

        # Normalize the color difference and pixel difference percentages
        normalized_color_difference = color_difference / 2
        normalized_pixel_difference = pixel_difference_percentage / 100

        # Calculate the similarity percentage based on normalized values
        similarity_percentage = 100 - (np.abs(normalized_color_difference) + np.abs(normalized_pixel_difference)) * 100

        return similarity_percentage

    # Example usage
    image1_path = "battleimg.png"

    def download_image(url, save_path):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for non-200 status codes

            with open(save_path, 'wb') as file:
                file.write(response.content)

            print("Image downloaded successfully.")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while downloading the image: {e}")

    image_url = userImageUrl  # Replace with the URL of the image you want to download
    save_path = "api/userImg.png"  # Replace with the path where you want to save the downloaded image

    download_image(image_url, save_path)

    # Open the image
    image = Image.open("api/userImg.png")

    # Crop the image from top-left corner to the specified size
    cropped_image = image.crop((0, 0, 400, 300))

    # Save the cropped image
    cropped_image.save("userImgCrop.png")

    image2_path = "userImgCrop.png"

    similarity_percentage = abs(calculate_similarity(image1_path, image2_path))
    # print(f"Similarity percentage: {similarity_percentage:.2f}%")
    return JsonResponse({"score": similarity_percentage}, safe=False)


""" @api_view(['POST'])
def getScore(request):
    # targetImageId = request.POST.get('id')
    userImageUrl = request.POST.get('url')

    def compare_images(image1_path, image2_path):
        # Open the images
        image1 = Image.open(image1_path)
        image2 = Image.open(image2_path)

        # Check if the images have the same dimensions
        if image1.size != image2.size:
            return 0  # Images are completely different

        width, height = image1.size
        pixels1 = image1.load()
        pixels2 = image2.load()

        diff_count = 0

        for y in range(height):
            for x in range(width):
                pixel1 = pixels1[x, y]
                pixel2 = pixels2[x, y]

                # Calculate the color difference between pixels
                diff = sum(abs(c1 - c2) for c1, c2 in zip(pixel1, pixel2)) / 3

                diff_count += diff

        # Calculate the percentage similarity
        total_pixels = width * height
        average_diff = diff_count / total_pixels
        similarity = 100 - (average_diff / 255) * 100

        return similarity

    # Example usage
    image1_path = "battleimg.png"

    def download_image(url, save_path):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for non-200 status codes

            with open(save_path, 'wb') as file:
                file.write(response.content)

            print("Image downloaded successfully.")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while downloading the image: {e}")

    image_url = userImageUrl  # Replace with the URL of the image you want to download
    save_path = "api/userImg.png"  # Replace with the path where you want to save the downloaded image

    download_image(image_url, save_path)

    # Open the image
    image = Image.open("api/userImg.png")

    # Crop the image from top-left corner to the specified size
    cropped_image = image.crop((0, 0, 400, 300))

    # Save the cropped image
    cropped_image.save("userImgCrop.png")

    image2_path = "userImgCrop.png"

    similarity_percentage = compare_images(image1_path, image2_path)
    # print(f"Similarity percentage: {similarity_percentage:.2f}%")
    return JsonResponse({"score": similarity_percentage}, safe=False)

 """

