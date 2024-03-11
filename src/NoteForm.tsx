import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect value={selectedTags.map(tag => {
                return {label: tag.label, value: tag.id}
              })} 
              isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markdownRef} rows={15} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="outline-primary">
            Save
          </Button>
          <Link to=".." />
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
