# scripts/generate_audio.py

import sys
from bark import SAMPLE_RATE, generate_audio
import soundfile as sf

def main():
    if len(sys.argv) < 3:
        print("Usage: generate_audio.py <text> <output_file>")
        sys.exit(1)

    text_prompt = sys.argv[1]
    output_path = sys.argv[2]

    audio_array = generate_audio(text_prompt)
    sf.write(output_path, audio_array, SAMPLE_RATE)

if __name__ == "__main__":
    main()
