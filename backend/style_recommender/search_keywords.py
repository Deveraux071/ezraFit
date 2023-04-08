import os
import openai

import sys
# to allow imports from parent directory, used for config
sys.path.append("..")
import config

openai.api_key = config.OPENAI_API_KEY


def generate(preferences):
    '''
    Generates search keywords based on the given style preferences. 

    preferences: dictionary with the style preferences 
        key - preference name, value - the value of the prefence

    returns a list of strings representing the key words that can be typed into a clothing store's search bar
    '''
    prompt = "Given the following clothing style preferences, give me some keywords that I can use to search for clothing on a website." 
    prompt += "Ensure that the keywords are given as a comma-separated list, with no period at the end.\n\n"
    for preference in preferences:
        prompt += "{0}: {1}\n".format(preference, preferences[preference])
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    keywords = response.choices[0].text.strip().split(",")
    for i in range(len(keywords)): 
        keywords[i] = keywords[i].strip()
    
    return keywords


# for testing (remove this later)

# if __name__=='__main__':

    # print(generate_search_keywords({
    #     "gender": "female", 
    #     "color": "blue", 
    #     "fit": "loose", 
    #     "occasion": "formal"
    # }))
