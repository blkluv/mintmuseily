import sys
from bark import SAMPLE_RATE, generate_audio
import soundfile as sf

def main():
    if len(sys.argv) < 3:
        print("Usage: generate_audio.py <text> <output_path>")
        return

    prompt = sys.argv[1]
    out_path = sys.argv[2]

    audio_array = generate_audio(prompt)
    sf.write(out_path, audio_array, SAMPLE_RATE)

if __name__ == '__main__':
    main()
