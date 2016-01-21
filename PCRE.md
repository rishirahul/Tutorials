## Components

* Data structure

  ----> a datastructure to store result of pattern compilation
  |
pcre *re;

* Compile the regular expression pattern, and handle errors that are detected.

re = pcre_compile(
  pattern, -------------- the pattern to detect of type char* 
  0,--------------------- default options
  &error,---------------- for error message
  &erroffset,------------ for error offset 
  NULL);----------------- use default character tables 
