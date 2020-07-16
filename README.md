
# The process of creating epub file from Pivotal contents

1.  Create a Pivotal contents zip file 

    The zip file is can be generated from the following command at the course 

    ```
    <core-spring-course - master> ./gradlew zip -xcheckLinks -PpdfPresentations
    ```

    The zip file contains everything including slides in PDF format, lab documents in HTML format, and hands-on zip file 

1.  Construct epub file structure (this is a manual process for now)

    -   Extract html files from the unzipped zip file using a script
    -   Create/modify epub meta files (especially `content.opf`)
    -   Dump the html file tree structure (from the Pivotal zip file) onto the `OEBPS/Text` directory
    -   Modify any relevant meta info. such as version numer


1.  Run `build-epub.sh` to create `core-spring.epub` in the home directory

1.  Test it by reading it using a reader such as `VitalSource Bookshelf`
